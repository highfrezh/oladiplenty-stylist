from django.shortcuts import render


def home(request):
    return render(request, "pages/home.html")


def shop_collections(request):
    return render(request, "pages/shop_collections.html")


def bespoke(request):
    return render(request, "pages/bespoke.html")


def consulting(request):
    return render(request, "pages/consulting.html")


def about(request):
    return render(request, "pages/about.html")


def contact(request):
    return render(request, "pages/contact.html")


def corporate_wear(request):
    return render(request, "pages/corporate_wear.html")


def all_season(request):
    return render(request, "pages/all_season.html")


def african_prints(request):
    return render(request, "pages/african_prints.html")


def abaya_collection(request):
    return render(request, "pages/abaya_collection.html")


def reusable_bags(request):
    return render(request, "pages/reusable_bags.html")


def product_detail(request, product_id):
    return render(request, "pages/detail.html")