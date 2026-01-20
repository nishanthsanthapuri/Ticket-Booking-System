await redis.set(`lock:event:${eventId}`, "locked", "NX", "EX", 10);
