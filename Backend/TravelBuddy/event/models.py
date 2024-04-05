from django.db import models

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    startdate = models.DateField()
    enddate = models.DateField()
    location = models.CharField(max_length=100)
    identifier = models.CharField(max_length = 50, default = "localevents")
    image = models.ImageField(upload_to='event', null = True)
    tag = models.TextField(null= True)


    def __str__(self):
        return self.name