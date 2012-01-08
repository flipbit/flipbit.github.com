---
layout: base
title: Auto starting a virtual server in VMware Server 2.0
title_short: Auto starting a virtual server in VMware Server 2.0
pretty_date: Thursday, 6 November 2008
---
<p>
I’ve recently been investigating using virtual machines for testing and deploying environments using the free <a href="http://www.vmware.com/products/server/" title="VMware Server 2.0 Download">VMware Server 2.0</a>.  Whilst all went remarkably smoothly, one problem that had me stumped for a few hours was working out how to get the guest machines to automatically start when the host was rebooted.  Google didn’t provide a solution, but eventually I found this:
</p>
<p>
Click on the “Host” machine in the inventory tab:
</p>
<p>
<img alt="Select the Host machine in the inventory tab" src="http://www.cogworks.co.uk/images/blog/vmware-how-to-start-automatic-1.png" />
</p>
<p>An “<i>Edit Virtual Machine Startup/Shutdown Settings</i>” menu item should appear on the right:</p>
<p><img alt="Select Edit Startup/Shutdown Settings" src="http://www.cogworks.co.uk/images/blog/vmware-how-to-start-automatic-2.png" /></p>
<p>You can then move the machines up and down to enable automatic startup... simple!  (If you know how)</p>
<p><img alt="Choose which machines to startup and in which order" src="http://www.cogworks.co.uk/images/blog/vmware-how-to-start-automatic-3.png" /></p>