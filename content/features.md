+++
title = "Features"
description = "What AquilaOS's kernel, drivers, network stack and user space support, and the software ported to it."
[extra]
numbered = true
diagram = true
lede = "AquilaOS is built toward POSIX.1-2008. Everything below is in the [source tree](https://github.com/thethumbler/aquila), documented in [the kernel's documents](https://github.com/thethumbler/aquila/tree/main/docs/kernel) and covered by its QEMU test suite, unless it's listed under *Not yet*."
+++


## Architectures

- **x86-64**, the default.
- **i386**, using up to 768 MiB of memory.
- **aarch64**, on QEMU's virt machine: the GIC, the generic timer, the PL031 clock, PSCI and the devicetree. It runs the whole system on one CPU, with its console on the PL011 serial port.

On the PC, AquilaOS boots with [Limine](https://limine-bootloader.org/), from an ISO image, a hard disk image or directly from QEMU. The kernel keeps its design apart from the machine, in three layers: the kernel, the architecture (the CPU) and the platform (the machine around it). The documents say which parts are x86's or the PC's, and the few places where the line is still blurred.

## Kernel

- A monolithic kernel with processes and threads, and kernel threads of its own.
- SMP on x86: up to 32 CPUs, found in ACPI's tables. User programs run on every CPU at once; the kernel runs on one at a time, under one kernel lock (`smp=off` turns it off).
- Sessions, process groups, controlling terminals and job control.
- POSIX signals, delivered on the way back to user mode; a handler's frame keeps the FPU state.
- Virtual memory with copy-on-write, demand paging and `mmap`, a buddy allocator for pages and a vmem arena for the kernel's objects. Running out of memory is an error, not a panic.
- User memory is reached only through `copyin` and `copyout`: a bad pointer fails with `EFAULT` instead of crashing the kernel.
- A clock to the nanosecond, from the invariant TSC or the HPET, and the PIT without them; the wall clock follows the real-time clock.
- Interrupts through the APIC, with I/O APIC routes from ACPI's tables, shared IRQs and MSI; the 8259 PIC without one.
- `getrandom`, `/dev/random` and `/dev/urandom`.
- Debugging: `make debug` boots the kernel waiting for gdb, and a panic prints a stack trace that `mk/backtrace.sh` turns into names.

## Filesystems

| | |
|---|---|
| ext2 | read and write |
| minix | read and write |
| tmpfs | read and write |
| initramfs | a CPIO archive, read only |
| devfs and devpts | device files and pseudo-terminals |
| procfs | process information, `/proc/interrupts` |

## Devices

- Virtual terminals on the framebuffer or VGA text mode, switched with Alt+F1 to Alt+F6, with graphics and raw keyboard modes as on the Linux console.
- A VESA framebuffer with the Linux fbdev API.
- PS/2 keyboard and mouse (`/dev/mouse` works like Linux's `/dev/psaux`).
- ATA hard disks in PIO mode.
- Serial ports: the 8250 UART (COM1 and COM2) on the PC, ARM's PL011 on aarch64.
- Intel 8254x Ethernet (e1000), and the 82574L (e1000e) with MSI; on aarch64 too, over PCI Express.
- PCI through the platform's host bridge: configuration mechanism #1 on the PC, ECAM on aarch64.

## Network

- IPv4, ARP and ICMP, and the loopback interface.
- TCP following RFC 9293: retransmission, NewReno congestion control, delayed ACKs, Nagle's algorithm and keepalive.
- UDP and ping sockets, and Unix domain sockets.
- DHCP with sdhcp, and a DNS resolver in the C library that reads `/etc/hosts` first and falls back to TCP for long answers.

## Base system

As on the BSDs, some third-party software is part of the base system. It's built from upstream sources with the rest of the system.

| | |
|---|---|
| C library | newlib 4.6, with AquilaOS's system calls |
| `/bin/sh` | dash 0.5.13 |
| Core utilities | sbase |
| init | runit 2.3, which also supervises services such as the logins and DHCP |
| Network tools | OpenBSD's netcat, sdhcp |
| System tools | aqbox: `login`, `ps`, `mount`, `ifconfig`, `route` and others |

## Ports

Optional software, built with `make ports` and included in the system image.

| Port | Version | |
|---|---|---|
| bash | 5.3.20 | shell |
| curl | 8.23.0 | with Mbed TLS 3.6 and the CA certificates, for HTTPS |
| tcc | 0.9.28rc | a C compiler that builds programs on AquilaOS itself |
| Lua | 5.5.1 | |
| vis | 0.9 | a vi-like editor, on ncurses 6.6 |
| kilo | | a small text editor |
| TinyX | 1.2.0 | an X server on the framebuffer, started with `startx` |
| twm | 1.0.13.1 | window manager |
| dwm | 6.5 | window manager |
| dmenu | 5.3 | |
| st | 0.9.2 | terminal emulator |
| xterm | 401 | terminal emulator |
| Microwindows | | Nano-X: windows on the framebuffer, its demos (Nuklear's among them) and nxterm |
| UnixBench | 6.0.1 | `ubench`, its index without Perl |
| doomgeneric | | Doom, with Freedoom 0.13, on the framebuffer or in X |

The X ports bring their libraries with them: Xlib and XCB, the X Toolkit and Athena widgets, Xft with FreeType and Fontconfig, and the DejaVu and X.Org misc fonts.

## Not yet

- Finer locking than the one kernel lock, and SMP on aarch64.
- Loadable kernel modules.
- ext3 and ext4.
- TCP window scaling, SACK and timestamps.
- IPv6.
