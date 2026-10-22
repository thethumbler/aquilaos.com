+++
title = "Try AquilaOS"
description = "Run AquilaOS in your browser: the i386 base system on v86, a PC emulator."
template = "try.html"
aliases = ["v86/"]
+++

## Things to try

- `uname -a`: the kernel's version, and the compiler that built it
- `ps`: the processes, with the kernel's threads in brackets
- `cat /proc/interrupts`: interrupts, by IRQ
- `ls /sbin`: aqbox's system tools, and runit
- `sleep 100 &`, then `jobs`, `fg` and Ctrl+Z: job control

## What's in it

The live system is AquilaOS's base system for i386 on a 2 MiB disk: the kernel, newlib, dash, sbase's utilities, aqbox and runit. Its root filesystem is in memory, so whatever you change is gone when you reload the page.

The ports aren't included, to keep the download small: there's no bash, X or Doom here. There's no network either, since v86 doesn't emulate the Intel e1000 that AquilaOS drives. To try those, [build AquilaOS](@/build.md) and run it in QEMU.

## Credits

[v86](https://github.com/copy/v86) by Fabian Hemmer and its contributors ([BSD 2-Clause](/try/licenses/v86.txt)), and [xterm.js](https://xtermjs.org/) by its authors ([MIT](/try/licenses/xterm.js.txt)). The emulated PC's BIOS is [SeaBIOS](https://www.seabios.org/) ([LGPL 3.0](/try/licenses/seabios-lgpl-3.0.txt)), as v86 builds it: see [its configuration and build script](https://github.com/copy/v86/tree/7e6be1e2abfc653052c6ff3f5d45dfe867c7d72b/bios).
