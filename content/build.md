+++
title = "Build and run"
description = "How to boot AquilaOS's kernel in a minute, then build the whole system from source on Linux and run it in QEMU."
[extra]
numbered = true
+++

AquilaOS is built from source on a Linux host into `build/`. The kernel alone needs only your gcc; the whole system builds its own toolchain first. There are no prebuilt images yet, but you can [try it in your browser](@/try.md).

## Start here

You need `gcc`, `ld`, `cpio` and `qemu-system-x86_64`, nothing else:

```
git clone https://github.com/thethumbler/aquila
cd aquila
make run-min        # the kernel, booted with one tiny program (about a minute)
```

`make run-min` builds the kernel with your gcc and boots it in QEMU with `start/init.c` as the only program: a tiny shell with no C library, each of its commands a system call or two. Type `help`; Ctrl-A X quits QEMU. Then:

1. **Read** [the kernel's documents](https://github.com/thethumbler/aquila/tree/main/docs/kernel), in order: how the kernel boots, takes interrupts, manages memory and processes, and the rest, each with pointers into the code.
2. **Change something.** Add a command to `start/init.c`, or a `printk()` to a system call (`sys_getpid()` in `kernel/sys/sys_proc.c`, the others in `kernel/sys/sys_*.c` by subject), and `make run-min` again.
3. **Debug it.** `make debug` boots the same kernel with debugging information, and QEMU waits for gdb: `gdb -x mk/gdbinit` stops in `kmain()`. A panic prints a stack trace, and `mk/backtrace.sh <kernel> < log` names its addresses.
4. **Test it.** `make test` runs the kernel's test suite, built with your gcc too.
5. **Build the whole system**, below.

For aarch64, `make run-min CONFIG=aarch64-virt` (it needs `clang`, `ld.lld` and `qemu-system-aarch64`); for i386, `CONFIG=i386-pc` (gcc with 32-bit support).

## What you need

For the whole system: a C and C++ compiler with 32-bit support, `make`, `bison`, `flex`, `texinfo`, the GMP, MPFR and MPC headers, `wget`, `nasm`, `cpio`, `xorriso` and QEMU, and for the ports `gperf`, autoconf, automake and libtool. On Debian or Ubuntu:

```
sudo apt install build-essential gcc-multilib bison flex texinfo libgmp-dev \
    libmpfr-dev libmpc-dev wget nasm cpio xorriso qemu-system-x86 gperf \
    autoconf automake libtool
```

## Build

```
make toolchain      # the x86_64-aquila GCC, binutils, newlib and Limine (once, about 15 minutes)
make                # the kernel, user space, contrib/ and the initrd
make ports          # optional: bash, curl, X, Doom and the rest
```

`make ports` builds only the ports that are out of date.

## Run

```
make run            # boot in QEMU with the console on the serial port
make run-iso        # boot the ISO image, on the screen
make run-hdd        # boot from a hard disk image that keeps what's written to it
```

Log in as `root`, with no password. With the ports built, `startx` on the screen starts X with twm and an xterm.

The ISO and `make run` boot a ramdisk, the same on every boot. `make run-hdd` makes `build/x86_64/aquila.img` the first time: Limine on a FAT32 `/boot` and the root filesystem on ext2. After that it updates the kernel and the system's files on the disk and keeps the rest.

QEMU gives the machine one CPU unless you ask for more (`-smp 4`); AquilaOS uses up to 32.

## Network

QEMU's default network card is an e1000, which AquilaOS drives. Get an address from QEMU's DHCP server with:

```
ifconfig eth0 up
sdhcp eth0
curl https://example.com
```

Or set it on the kernel command line with `ip=10.0.2.15/24:10.0.2.2`.

## Other architectures

`CONFIG` picks another architecture, each with its own toolchain:

```
make toolchain CONFIG=i386-pc           # i386
make CONFIG=i386-pc
make run CONFIG=i386-pc

make toolchain CONFIG=aarch64-virt      # aarch64, on QEMU's virt machine
make CONFIG=aarch64-virt
make run CONFIG=aarch64-virt
```

On aarch64 the console is the serial port: there are no virtual terminals, so no X.

## Tests

`make test` boots the kernel in QEMU with test programs and checks the system built from source: the C library, system calls, memory, signals, filesystems, TCP, SMP and the ports. `tests/run.sh` takes the architecture (`-a`), the number of CPUs (`-c`) and how many tests run at once (`-j`). See the [tests' README](https://github.com/thethumbler/aquila/tree/main/tests) and the top of the Makefile for every target.

## Documentation

The [kernel's documents](https://github.com/thethumbler/aquila/tree/main/docs/kernel) are in the source tree, in `docs/kernel/`. To read them as a website, with the code reference from the comments in the sources (it needs Doxygen):

```
make docs           # build/docs/kernel/api/index.html
make docs-serve     # the same, on http://localhost:8000/
```
