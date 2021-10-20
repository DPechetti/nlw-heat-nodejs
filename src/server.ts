import { httpServer } from "./app";

httpServer.listen(3333, () => console.log('service running on port 3333'))