---
layout: base
title: Auto starting a virtual server in VMware Server 2.0
title_short: Auto starting a virtual server in VMware Server 2.0
pretty_date: 6 November 2008
---

I’ve recently been investigating using virtual machines for testing and
deploying environments using the free [VMware Server 2.0][]. Whilst all
went remarkably smoothly, one problem that had me stumped for a few
hours was working out how to get the guest machines to automatically
start when the host was rebooted. Google didn’t provide a solution, but
eventually I found this:

Click on the “Host” machine in the inventory tab:

<div class="center">
    <img title="Select the Host machine in the inventory tab" alt="Select the Host machine in the inventory tab" src="/content/images/blog/vmware-how-to-start-automatic-1.png" />
</div>

An “*Edit Virtual Machine Startup/Shutdown Settings*” menu item should
appear on the right:

<div class="center">
    <img title="Select Edit Startup/Shutdown Settings" alt="Select Edit Startup/Shutdown Settings" src="/content/images/blog/vmware-how-to-start-automatic-2.png" />
</div>

You can then move the machines up and down to enable automatic startup…
simple! (If you know how)

<div class="center">
    <img title="Choose which machines to startup and in which order" alt="Choose which machines to startup and in which order" src="/content/images/blog/vmware-how-to-start-automatic-3.png" />
</div>

  [VMware Server 2.0]: http://www.vmware.com/products/server/     "VMware Server 2.0 Download"

