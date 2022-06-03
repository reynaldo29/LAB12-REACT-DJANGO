
from rest_framework import serializers
from .models import Prestamo


class PrestamoSerializer(serializers.ModelSerializer):
    
    libro=serializers.CharField(source="libro.titulo",read_only=True)
    usuario=serializers.CharField(source="usuario.nombre",read_only=True)
    
    class Meta:
        model = Prestamo
        fields = '__all__'
            
    def create(self, validated_data):
        return Prestamo.objects.create(**validated_data)

  