    E:\LMS\server\utils\jwt.ts

    error code
    //upload session to redis
    redis.set(user._id, JSON.stringify(user) as any);
    
    error solve by
    redis.set(user.id, JSON.stringify(user) as any);
