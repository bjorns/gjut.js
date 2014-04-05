gjut.js
=======

Ask any old unix beard how much preprocessor code is a dignified amount and they will likely tell you _as little as possible_. In fact, since C++, no new major programming languange has used a preprocessor and that for good reason.

Except HTML templating that is. For some reason we still gladly suffer 1950's style development tools when we generate HTML. Why is that?

Gjut is a semantic templating language. This means unlike ordinary templating systems like rhtml or
velocity, it cares whether you produce proper html.

So far _Gjut_ is merely an experiment to make a point.

Requirements
------------
 * [Node.js](http://nodejs.org)
 * [PEG](http://pegjs.majda.cz) is a javascript parser generator.
 * [stdio](http://sgmonda.github.io/stdio/) is used in gjutc for command line parsing.
 * [nodeunit](https://github.com/caolan/nodeunit) runs the tests.
 * [GNU Make](https://www.gnu.org/software/make/) is optional.

Usage
------
Gjut comes with an example command line compiler.

    $ ./bin/gjutc example/index.html


Macros
------

##### @import

Imports a javascript module.

    @import dir.file

Loads dir/file.js

##### @insert

Inserts an html file.

    @insert header.html

##### Variables

Assuming the module _modulename_ returns

    return {
        foobar: 'Hello, world!'
    }

the variable @modulename.foobar can be inserted as an element content and will render _Hello, world!_.

##### Element functions

Assuming your module returns:

    return {
        func: function(element) {
            element.attributes['id'] = ['syntheticId'];
        }
    }

The input

    <div @modulename.func()></div>

will render as:

    <div id="syntheticId"></div>


##### @foreach

Assuming your module returns:

    return {
      listItem: function listItem(element, i) {
        element.content.push({
          type: 'text',
          content: '=== ' + i + " ==="
        });
      }
      array: ['foo', 'bar', 'baz']
    }

and your html contains

    <li @foreach(@variables.listItem() in @variables.array)></li>

the output will be

    <li>
      === foo ===
    </li>
    <li>
      === bar ===
    </li>
    <li>
      === baz ===
    </li>
