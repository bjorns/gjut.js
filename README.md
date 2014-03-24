gjut.js
=======

Ask any old unix beard how much preprocessor code is a dignified amount and they will likely tell you as little as possible. In fact, since C++, no new programming languange has used a preprocessor. This is because it will eat your soul. 

Except for HTML generation that is. For some reason we still gladly suffer 1950s style development tools when we generate HTML. Why is that?

Gjut is a parsed templating language. This means unlike ordinary templating systems like rhtml or 
velocity, it cares whether you produce proper html.

So far it is merely an experiment to prove a point. 

Requirements
------------
[Node.js](http://nodejs.org) and [PEG](http://pegjs.majda.cz). GNU Make helps.

Howto
------
Check out, run make. Look at example.html and example/variables.js to see the input.
