---
layout: page
title: Features
subtitle: You know it rocks already
---

AquilaOS is split into various modular parts

### Kernel

#### kernel/core
Contains all core (misc) parts that do not fit into any subsystem (such as printk and panic)

#### kernel/dev
Devices subsystem

##### kdev
kdev services as a binding for registered character & block devices, it routes vfs requests to approrpiate device using major/minor number

#### CPU-based Features:
##### Supported Archetictures:
- x86

#### Kernel Features:
- Monolitihic kernel
- Virtual Filesystem

#### Supported Filesystems:
- initramfs (used for Ramdisk, currently supports CPIO archives only, read only)
```
 kernel/fs/initramfs/
```
- tmpfs (Generic temporary filesystem, read/write)
```
 kernel/fs/tmpfs/
```
- devfs (tmpfs, used for device handlers, statically populated, read/write)
```
 kernel/fs/devfs/
```
- devpts (tmpfs, used for psudo-terminals, dynamically populated, read/write)
```
 kernel/fs/devpts/
```
- procfs (Processes information filesystem, read only by definition)
```
 kernel/fs/procfs/
```
- ext2 (Basic Extended 2 filesystem, read/write)
```
 kernel/fs/ext2/
```

#### Supported Devices:
- ramdev  (Memory mapped device, generic handler)
```
 kernel/devices/ramdev.c
```
- i8042   (PS/2 Controller)
```
 kernel/devices/i8042.c
```
- ps2kbd  (PS/2 Keyboard Controller)
```
 kernel/devices/ps2kbd.c
```
- console (IBM TGA console)
```
 kernel/devices/console.c
```
- ata     (ATA Harddisk handler, PIO mode)
```
 kernel/devices/bus/ata.c
```
- fbdev   (Generic framebuffer device handler)
```
 kernel/devices/video/fbdev/
```

#### Supported video interfaces:
- VESA 3.0
```
 kernel/devices/video/fbdev/vesa.c
```


#### System Feautres:
- Newlib C Library (version 3.0.0 latest)
