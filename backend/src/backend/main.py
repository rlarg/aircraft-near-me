from fastapi import FastAPI

app = FastAPI(title="Aircraft near me API")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
