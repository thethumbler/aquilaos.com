// AquilaOS in the browser: v86 emulates a PC that boots the live disk, and
// xterm.js is the terminal on its serial port, where AquilaOS has a login.
"use strict";

(function () {
    // the machine's files are next to this script, wherever the page is
    const base = document.currentScript.src.replace(/[^/]*$/, "");

    const page = document.getElementById("try");
    const start = document.getElementById("try-start");
    const restart = document.getElementById("try-restart");
    const status = document.getElementById("try-status");
    const screen = document.getElementById("try-terminal");

    let emulator = null;
    let term = null;
    let booted = false;

    function fontSize() {
        return parseFloat(getComputedStyle(screen).getPropertyValue("--font")) || 16;
    }

    function say(text) {
        status.textContent = text;
    }

    function percent(e) {
        if (!e.lengthComputable || !e.total) return "";
        return " " + Math.floor(e.loaded / e.total * 100) + "%";
    }

    async function boot() {
        start.disabled = true;
        restart.hidden = false;
        page.classList.add("running");

        // the terminal draws with the kernel's console font once it's loaded
        try { await document.fonts.load("16px unscii"); } catch (e) { /* the fallback is fine */ }

        term = new Terminal({
            cols: 80,
            rows: 25,
            fontFamily: "unscii, ui-monospace, monospace",
            fontSize: fontSize(),
            lineHeight: 1,
            letterSpacing: 0,
            cursorBlink: true,
            convertEol: false,
            theme: { background: "#000000", foreground: "#aaaaaa", cursor: "#ffffff" },
        });
        term.open(screen);

        // the stylesheet picks the font size that fits the page; follow it
        new ResizeObserver(function () {
            const size = fontSize();
            if (term.options.fontSize !== size) term.options.fontSize = size;
        }).observe(screen.parentElement);
        term.write("Downloading AquilaOS...\r\n");

        emulator = new V86({
            wasm_path: base + "v86.wasm",
            memory_size: 128 * 1024 * 1024,
            vga_memory_size: 2 * 1024 * 1024,
            bios: { url: base + "seabios.bin" },
            vga_bios: { url: base + "vgabios.bin" },
            hda: { url: base + "aquila.img", async: false },
            autostart: true,
            disable_keyboard: true,
            disable_mouse: true,
            disable_speaker: true,
        });

        emulator.add_listener("download-progress", function (e) {
            say("Downloading " + e.file_name.replace(/^.*\//, "") + percent(e));
        });

        emulator.add_listener("emulator-started", function () {
            say("Booting");
        });

        // the serial port's bytes, a few at a time
        let pending = [];
        let scheduled = false;
        emulator.add_listener("serial0-output-byte", function (byte) {
            if (!booted) {
                booted = true;
                say("Running. Log in as root, with no password.");
            }
            pending.push(byte);
            if (!scheduled) {
                scheduled = true;
                requestAnimationFrame(function () {
                    term.write(new Uint8Array(pending));
                    pending = [];
                    scheduled = false;
                });
            }
        });

        // for poking at it from the browser's console
        window.aquila = { emulator: emulator, term: term };

        term.onData(function (data) {
            emulator.serial0_send(data);
        });

        term.focus();
    }

    start.addEventListener("click", boot);

    restart.addEventListener("click", function () {
        if (!emulator) return;
        booted = false;
        term.reset();
        say("Restarting");
        emulator.restart();
        term.focus();
    });
})();
