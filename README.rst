=======
mark.js
=======

mark.js is a javascript benchmarking framework that allows you to create benchmarks
and store the results persistently via the browser's local storage API.  You
have the option to run multiple trials in a browser session or reload the page
at a later time and have the results from the previous sessions saved.

**NOTE** If you add more benchmarks, you should clear your reports so all the
benchmarks are consistent.


*Dependencies:*

`store.js`_ - http://github.com/marcuswestin/store.js

.. _`store.js`: http://github.com/marcuswestin/store.js


TODO
~~~~

    * Add STDDEV and VARIANCE to the report fields.
    * Clicking on individual benchmarks should display performance graph over
        time using canvas API
    * Add ability to group and nest benchmarks.

This is still rough around the edges, please fork and make better

Thanks to Marcus Westin for store.js
