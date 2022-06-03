from django.contrib import admin

# Register your models here.
from .models import Libro
from .models import Usuario
from .models import Autor
from .models import Prestamo

admin.site.register(Libro)
admin.site.register(Usuario)
admin.site.register(Autor)
admin.site.register(Prestamo)