﻿



    document.addEventListener('DOMContentLoaded', function () {
        
        var EventLocationInfo = JSON.parse(localStorage.getItem('EventLocationInfo'));
        var form = document.getElementById('eventForm');
        console.log(JSON.stringify(EventLocationInfo));
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            sendEventInfo(EventLocationInfo);
            console.log(JSON.stringify(EventLocationInfo));
        });
    });

function sendEventInfo(EventLocationInfo) {
    console.log("CreateEvent", EventLocationInfo);
    var formData = {
        EventName: document.getElementById('eventName').value,
        StartTime: document.getElementById('startTime').value,
        EndTime: document.getElementById('endTime').value,
        Fee: parseFloat(document.getElementById('fee').value),
        PaypalAccount: document.getElementById('payPalAccount').value,
        LocationId: EventLocationInfo.location[0].locationId,
        SportId: EventLocationInfo.events[0].sport.sportId,
        
    };
    console.log("hii",EventLocationInfo.location.locationId);
    console.log("formData", JSON.stringify(formData));

    sendFetchRequest('/Event/CreateEvent', 'POST', formData);
}

function sendFetchRequest(url, method, data) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle success (e.g., show a success message)
            console.log(data);
        })
        .catch(error => {
            // Handle error (e.g., display validation errors)
            console.error(error);
        });
}
