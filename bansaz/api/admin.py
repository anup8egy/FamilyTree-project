from django.contrib import admin
from .models import (
    Profile,
    Clan,
    Staffmap,
    Person,
    Relation,
    ClanPersonRelation,
    RelationCalc,
)

# Register your models here.
admin.site.register(Profile)
admin.site.register(Clan)
admin.site.register(Staffmap)
admin.site.register(Person)
admin.site.register(Relation)
admin.site.register(ClanPersonRelation)
admin.site.register(RelationCalc)
