+++
title = "Build and run"
description = "How to build AquilaOS from source on Linux and boot it in QEMU."
[extra]
numbered = true
+++

AquilaOS is built from source on a Linux host, toolchain included, into `build/`. There are no prebuilt images yet.

## What you need

A C and C++ compiler with 32-bit support, `make`, `bison`, `flex`, `texinfo`, the GMP, MPFR and MPC headers, `wget`, `nasm`, `cpio`, `xorriso`, QEMU, and `gperf` for the ports. On Debian or Ubuntu:

```
sudo apt install build-essential gcc-multilib bison flex texinfo libgmp-dev \
    libmpfr-dev libmpc-dev wget nasm cpio xorriso qemu-system-x86 gperf
```

## Build

```
git clone https://github.com/thethumbler/aquila
cd aquila
make toolchain      # the x86_64-aquila GCC, binutils, newlib and Limine (once, about 15 minutes)
make                # the kernel, user space, contrib/ and the initrd
make ports          # optional: bash, curl, X, Doom and the rest
```

## Run

```
make run            # boot in QEMU with the console on the serial port
make run-iso        # boot the ISO image, on the screen
make run-hdd        # boot from a hard disk image that keeps what's written to it
```

Log in as `root`, with no password. With the ports built, `startx` on the screen starts X with twm and an xterm.

The ISO and `make run` boot a ramdisk, the same on every boot. `make run-hdd` makes `build/x86_64/aquila.img` the first time: Limine on a FAT32 `/boot` and the root filesystem on ext2. After that it updates the kernel and the system's files on the disk and keeps the rest.

## Network

QEMU's default network card is an e1000, which AquilaOS drives. Get an address from QEMU's DHCP server with:

```
ifconfig eth0 up
sdhcp eth0
curl https://example.com
```

Or set it on the kernel command line with `ip=10.0.2.15/24:10.0.2.2`.

## i386

`CONFIG=i386-pc` builds for i386 instead, with its own toolchain:

```
make toolchain CONFIG=i386-pc
make CONFIG=i386-pc
make run CONFIG=i386-pc
```

## Tests

`make test` boots the kernel in QEMU with test programs and checks the system built from source: the C library, system calls, memory, signals, filesystems, TCP and the ports. See the [tests' README](https://github.com/thethumbler/aquila/tree/main/tests) and the top of the Makefile for every target.
