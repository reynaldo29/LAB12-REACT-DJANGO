from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import Prestamo
from .serializers import PrestamoSerializer


# Create your views here.
class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def prestamo_list(request):
    """
    List all code serie, or create a new serie.
    """
    if request.method == 'GET':
        prestamo = Prestamo.objects.all()
        serializer = PrestamoSerializer(prestamo, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PrestamoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def prestamo_detail(request, pk):
    """
    Retrieve, update or delete a serie.
    """
    try:
        prestamo = Prestamo.objects.get(pk=pk)
    except Prestamo.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PrestamoSerializer(prestamo)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PrestamoSerializer(prestamo, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        prestamo.delete()
        return HttpResponse(status=204)