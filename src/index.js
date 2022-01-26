//! Default Compute@Edge template program.
import welcomePage from "./welcome-to-compute@edge.html";

// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));
async function handleRequest(event) {
  // Get the client request.
  let req = event.request;

  // Filter requests that have unexpected methods.
  if (!["HEAD", "GET"].includes(req.method)) {
    return new Response("This method is not allowed", {
      status: 405,
    });
  }

  let url = new URL(req.url);

  // If request is to the `/` path...
  if (url.pathname == "/") {
    // Below are some common patterns for Compute@Edge services using JavaScript.
    // Head to https://developer.fastly.com/learning/compute/javascript/ to discover more.

    // Create a new request.
    let CAPIResponse = await fetch(`https://content.code.dev-guardianapis.com/world/live/2021/sep/30/test-liveblog-30092021-1?show-blocks=body:pinned&api-key=${KEY}`, {
      method: "GET",
      backend: "origin-CODE",
    });
  

    let CAPIString = await CAPIResponse.text();
    console.log(CAPIString)
   
    // Send a default synthetic response.
    return new Response("hello world", {
      status: 200,
      headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    });
  }

  // Catch all other requests and return a 404.
  return new Response("The page you requested could not be found", {
    status: 404,
  });
}
