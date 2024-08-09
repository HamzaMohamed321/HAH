from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.gzip import GZipMiddleware
import time

hah = FastAPI()

hah.add_middleware(GZipMiddleware, minimum_size=1000)

# mount static files
hah.mount("/static", StaticFiles(directory="static", html=True), name="static")

# set up Jinja2 templates
templates = Jinja2Templates(directory="templates")


version = str(int(time.time()))  # This creates a timestamp
hah.mount("/static", StaticFiles(directory="static"), name="static")


@hah.middleware("http")
async def add_cache_control_header(request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/static"):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
    return response


@hah.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(
        "index.html", {"request": request, "version": version}
    )


@hah.get("/guide", response_class=HTMLResponse)
async def guide(request: Request):
    return templates.TemplateResponse("guide.html", {"request": request})


@hah.get("/contact", response_class=HTMLResponse)
async def contact(request: Request):
    return templates.TemplateResponse("contact.html", {"request": request})


@hah.get("/shop", response_class=HTMLResponse)
async def contact(request: Request):
    return templates.TemplateResponse("shop.html", {"request": request})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(hah, port=8001)
