import request from 'supertest';
import { httpserver } from "..";

it('returns error 403 on visiting any non post method', async () => {
    await request(httpserver)
        .get('/')
        .send()
        .expect(403);
});

it('returns error 400 when no request body is passed', async () => {
    await request(httpserver)
        .post('/')
        .send()
        .expect(400);
});

it('returns error 401 on visiting a protected route with invalid authorization', async () => {
    await request(httpserver)
        .post('/')
        .send({
            "jsonrpc": "2.0",
            "id": "1",
            "method": "track_rate",
            "params": [
                {
                    "name": "ethereum",
                    "symbol": "eth",
                    "enabled": "true"
                }
            ]
        })
        .expect(401);

    await request(httpserver)
        .post('/')
        .set({ 'x-api-key': 'wrongapikey' })
        .send({
            "jsonrpc": "2.0",
            "id": "1",
            "method": "track_rate",
            "params": [
                {
                    "name": "ethereum",
                    "symbol": "eth",
                    "enabled": "true"
                }
            ]
        })
        .expect(401);
});

it('returns error code -32700 Parameter Required when no or insufficient param is passed', async () => {
    const reply1 = await request(httpserver)
        .post('/')
        .send({
        "jsonrpc": "2.0",
        "id": "1",
        "method": "track_rate",
    })
    .expect(200);

    expect(reply1.body.error.code).toEqual(-32700)

    const reply2 = await request(httpserver)
        .post('/')
        .send({
            "jsonrpc": "2.0",
            "id": "1",
            "method": "track_rate",
            "params": [
                {
                    "symbol": "eth",
                    "enabled": "true"
                }
            ]
        })
        .expect(200);

    expect(reply2.body.error.code).toEqual(-32700)
});

it('returns error code -32700 when a method that is not registered', async () => {
    const reply1 = await request(httpserver)
        .post('/')
        .send({
            "jsonrpc": "2.0",
            "id": "1",
            "method": "unknown_method",
            "params": [
                {
                    "name": "ethereum",
                    "symbol": "eth",
                    "enabled": "true"
                }
            ]
        })
    .expect(200);

    expect(reply1.body.error.code).toEqual(-32700)
})

it('returns error code -32601 when method is not sent to the request', async () => {
    const reply1 = await request(httpserver)
        .post('/')
        .send({
        "jsonrpc": "2.0",
        "id": "1",
        "params": [
            {
                "name": "ethereum",
                "symbol": "eth",
                "enabled": "true"
            }
        ]
    })
    .expect(200);
    
    expect(reply1.body.error.code).toEqual(-32601)
})