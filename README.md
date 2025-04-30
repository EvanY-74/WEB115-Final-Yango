# TODO List final project by Evan Yango

https://evany-74.github.io/WEB115-Final-Yango/

## Reflection

### How it works
First, add a task and set the priority and importance. Then click "Add task". Now you can see information about your task. There are also a "done" checkbox and delete button so you can interact with these tasks.

### Features
Priorities are color coded. Low is yellow; medium is orange; and high is red. When a task is important, the whole box will be red. Any updates to any of the tasks will print out the whole tasks array in the console. Clicking the "done" text next to a checkbox will also toggle it.

### Additional thoughts
My approach was to store objects in a tasks array so it could easily be accessed and printed to the console. To access a task when there was an event, I used the built in `id` property so an element in the DOM could easily be mapped to an object in the tasks array using the `.find()` method. The most challenging thing for me was the styling (because its css...) and getting the "done" text to also toggle the checkbox because originally, it was a little hard to click the checkbox. It wasn't as simple as toggling the .checked property on a checkbox because I also had to update the tasks array. I ended up moving the event listener of the checkbox out into a separate function so I could call it using `.apply()` so the `this` keyword would work.