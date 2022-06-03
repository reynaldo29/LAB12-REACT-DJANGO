from pickle import TRUE
from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class Libro(models.Model):
    codigo = models.IntegerField()
    titulo = models.CharField(max_length=100)
    esbn=models.CharField(max_length=30)
    editorial=models.CharField(max_length=60)
    num_pags=models.SmallIntegerField()


class Autor(models.Model):
    nombre=models.CharField(max_length=100)
    nacionalidad =models.CharField(max_length=50)
    libro=models.OneToOneField(Libro,on_delete=models.CASCADE)


class Usuario(models.Model):
    num_usuario=models.IntegerField()
    nif=models.CharField(max_length=20)
    nombre=models.CharField(max_length=100)
    direccion=models.CharField(max_length=255)
    telefono=models.CharField(max_length=20)



class Prestamo(models.Model):
    libro = models.ForeignKey(Libro,on_delete=models.CASCADE)
    usuario=models.ForeignKey(Usuario,on_delete=models.CASCADE)
    fecha_prestamo=models.DateTimeField(auto_now=TRUE)
    fecha_devolucion=models.DateTimeField()

