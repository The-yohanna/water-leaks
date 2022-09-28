# water-leaks
This a system that receives water-leak SMS alerts from the public, notifies the water authorities providing location and directions to the area with the leak.

The system utilizes websocket to establish an end to end communication channel between the client and server. The water leaks locations are sent to an endpoint in the server which geocodes the location and stores the informaation in the database. The server also watches for any location insertion in the database and sends any new location to the client. The client on receiving such creates a location marker on the map, displays the direction to the location from the water office and creates a sound alert.
