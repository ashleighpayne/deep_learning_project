# The Problem
Basically spotify is a bitch and in order to get an access token you have to be in a web server
However once I got the token to go through the webserver all the tensorflow stuff broke because now it was refrenceing things from the server not the machine

# The Work Around
*Run spotify.js
'''
node spotify.js
'''
*Click Login
*When you are redirected back to the page click download (If you have already logged in once it might not redirect you, you should see that the url is longer than just localhost:888)
*After downloading Access_Token.txt then move that to the root of the directory
*Now running spotify_controller.js should work and give the functionality for toggle pause, skip, play previous
