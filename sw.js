// self = this (BOM)
self.addEventListener("install", e=>{
    console.log("SW install");
}) 
self.addEventListener("activate", e=>{
    console.log("SW activate!");
}) 
self.addEventListener("fetch", e=>{
    console.log("SW fetch");
}) 