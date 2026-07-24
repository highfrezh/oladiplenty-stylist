from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("shop-collections/", views.shop_collections, name="shop_collections"),
    path("bespoke/", views.bespoke, name="bespoke"),
    path("masterclass/", views.consulting, name="masterclass"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("corporate-wear/", views.corporate_wear, name="corporate_wear"),
    path("all-season/", views.all_season, name="all_season"),
    path("african-prints/", views.african_prints, name="african_prints"),
    path("abaya-collection/", views.abaya_collection, name="abaya_collection"),
    path("reusable-bags/", views.reusable_bags, name="reusable_bags"),
    path("product/<str:product_id>/", views.product_detail, name="product_detail"),
]