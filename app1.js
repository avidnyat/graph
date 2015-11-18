jsPlumb.ready(function () {

    var instance = jsPlumb.getInstance({

        Endpoint: ["Dot", {radius: 2}],
        Connector:[ "Flowchart", {  midpoint: 1 } ],

        HoverPaintStyle: {strokeStyle: "red", lineWidth: 2 },
        ConnectionOverlays: [
            [ "Arrow", {
                location: 1,
                id: "arrow",
                length: 14,
                foldback: 0.2
            } ],

        ],
        Container: "canvas"
    });
    instance.registerConnectionType("basic", { anchor:"Continuous", connector:"StateMachine" });


    var shapes = jsPlumb.getSelector(".shape");
    // make everything draggable
    instance.draggable(shapes);

    // suspend drawing and initialise.
    instance.batch(function () {

        // loop through them and connect each one to each other one.
        /*for (var i = 0; i < shapes.length; i++) {
            for (var j = i + 1; j < shapes.length; j++) {
                instance.connect({
                    source: shapes[i],  // just pass in the current node in the selector for source
                    target: shapes[j],
                    // here we supply a different anchor for source and for target, and we get the element's "data-shape"
                    // attribute to tell us what shape we should use, as well as, optionally, a rotation value.

                });
            }
        }*/
        for(var key in shapes) {
            //initNode(shapes[key], true);
        }
        for(var key in json.Links){
console.log(shapes[json.Links[key].Origin])
            if($(shapes[json.Links[key].Origin]).data("color") == "Yellow"){
                instance.connect({
                    source: $(shapes[json.Links[key].Origin]).attr("id"),  // just pass in the current node in the selector for source
                    target: $(shapes[json.Links[key].Destination]).attr("id"),
                    type: "basic",
                    label: json.Links[key].Text, id: "label", cssClass: "aLabel",
                    paintStyle: {strokeStyle: $(shapes[json.Links[key].Origin]).data("color"), lineWidth: 2 },

                });
                $(shapes[json.Links[key].Destination]).removeClass("shape-notallowed");
                $(shapes[json.Links[key].Destination]).click(function(){
                    $(".shape").removeClass("click-shape");
                    $(this).addClass("click-shape");
                    alert($(this).text())
                });
            }else{
                instance.connect({
                    source: $(shapes[json.Links[key].Origin]).attr("id"),  // just pass in the current node in the selector for source
                    target: $(shapes[json.Links[key].Destination]).attr("id"),
                    type: "basic",
                    label: json.Links[key].Text, id: "label", cssClass: "aLabel",
                    paintStyle: {strokeStyle: $(shapes[json.Links[key].Origin]).data("color"), lineWidth: 2 },

                });

            }

        }
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);
});