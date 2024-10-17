({
    initialLoad: function(component, event, helper) {

        var dragging = false;
        var knobOffset = 0;

        var track = component.find("track"),
            knob = component.find("knob"),

            trackWidth = track.offsetWidth,
            trackLeft = track.offsetLeft,
            trackRight = trackLeft + trackWidth,

            knobWidth = knob.offsetWidth,
            maxRight = trackWidth - knobWidth; // relatively to track

        window.addEventListener('mouseup', function(e) {
            dragging = false;
        })

        window.addEventListener('mousemove', function(e) {
            if (dragging) {
                // current knob offset, relative to track
                var offset = e.clientX - trackLeft - knobOffset;
                if (offset < 0) {
                    var offset = 0;
                } else if (offset > maxRight) {
                    var offset = maxRight;
                }

                knob.style.left = offset + "px"
            }
        });
    },

    onMouseDown: function(component, event, helper) {
        var knob = component.find("knob").getElement();
   
        knob.addEventListener('mousedown', function(e) {
            // knob offset relatively to track
            knobOffset = e.clientX - knob.offsetLeft;
       });
   },
})