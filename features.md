---
layout: page
title: Features
subtitle: You know it rocks already
---

AquilaOS is a UNIX-like operating system and many features of typical UNIX systems are included

### Kernel
AquilaOS kernel is monolithic
- supports multitasking and multithreading
- sessions, process groups and job control
- virtual filesystem (vfs)
- devices subsystem (kdev) using major/minor numbers
- memory managment subsystem (with COW and allocate on demand)

#### Supported filesystems
initramfs, tmpfs, devfs, devpts, procfs, ext2

#### Supported devices
i8042 (PS/2 controller), i8253/i8254 PIT, HPET, i8259 (PIC), fbdev (VESA 3.0), pty, 8250 (UART), PS/2 Keyboard, ATA

### System
System consists of aquila specific parts and 3rd part utilities

#### aqbox
Aquila Box (like busybox) with the following commands
cat, clear, echo, env, login, ls, mkdir, mknod, mount, ps, pwd, sh, stat, uname, unlink

#### fbterm
Framebuffer based terminal with wallpaper, transparency and Tinyfont support

#### 3rd party utils.
tcc (Tiny C Compiler), lua, kilo (Text editor), simplex (programming language)
