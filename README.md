JSON RPC SERVER

- get rate

{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "get_rate",
    "params": []
}

--->

{
    "jsonrpc": "2.0",
    "id": "1",
    "result": {
        "rates": [
            {
                "name": "bitcoin",
                "price": 24632
            },
            {
                "name": "dogecoin",
                "price": 0.086661
            },
            {
                "name": "ethereum",
                "price": 1677.01
            },
            {
                "name": "litecoin",
                "price": 93.41
            }
        ]
    },
    "error": null
}


- track rate

{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "track_rate",
    "params": [
        {
            "name": "dogecoin",
            "symbol": "doge",
            "enabled": "true"
        }
    ]
}

--->

{
    "jsonrpc": "2.0",
    "id": "1",
    "result": {
        "name": "dogecoin",
        "symbol": "doge",
        "enabled": true,
        "id": "63f4bc60e177650f9f144597"
    },
    "error": null
}