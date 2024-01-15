from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/server/costs/{item_id}")
def get_server_cost(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/server/costs")
def
