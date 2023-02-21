import request from 'supertest';
import { httpserver } from "..";

it('can get empty rate from endpoint', async () => {
    const response = await request(httpserver)
        .post('/')
        .send({
            "jsonrpc": "2.0",
            "id": "1",
            "method": "get_rate",
            "params": []
        })
        .expect(200);
    
    expect(response.body.id).toEqual("1")
    expect(response.body.result.rates).toEqual([])
});

it('can specify to track crypto rate from endpoint', async () => {

    const track = await request(httpserver)
        .post('/')
        .set({ 'x-api-key': 'testapikey' })
        .send({
            "jsonrpc": "2.0",
            "id": "1",
            "method": "track_rate",
            "params": [
                {
                    "name": "bitcoin",
                    "symbol": "btc",
                    "enabled": "true"
                }
            ]
        })
        .expect(200);
    
    expect(track.body.result.id).toBeDefined()
    expect(track.body.result.name).toEqual('bitcoin')
    expect(track.body.result.symbol).toEqual('btc')
    expect(track.body.result.enabled).toEqual(true)
});

it('can specify to track crypto rate from endpoint and get rate from endpoint', async () => {

    const track = await request(httpserver)
        .post('/')
        .set({ 'x-api-key': 'testapikey' })
        .send({
            "jsonrpc": "2.0",
            "id": "1",
            "method": "track_rate",
            "params": [
                {
                    "name": "bitcoin",
                    "symbol": "btc",
                    "enabled": "true"
                }
            ]
        })
        .expect(200);

    const response = await request(httpserver)
        .post('/')
        .send({
            "jsonrpc": "2.0",
            "id": "1",
            "method": "get_rate",
            "params": []
        })
        .expect(200);
        
    expect(response.body.result.rates.length).toEqual(1)
    expect(response.body.result.rates[0].name).toEqual('bitcoin')
});