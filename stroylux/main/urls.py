import private_storage.urls
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps import views
from django.contrib.staticfiles.views import serve
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .core.sitemaps import sitemaps
from .graphql.api import schema
from .graphql.views import GraphQLView

urlpatterns = [
    url(r"^graphql/", csrf_exempt(GraphQLView.as_view(schema=schema)),
        name="api"),
    url(r"^admin/", admin.site.urls),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^private-media/', include(private_storage.urls)),
    path('sitemap.xml', views.index, {'sitemaps': sitemaps},
         name='sitemap-index'),
    path('sitemap-<section>.xml', views.sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap')
]

if settings.DEBUG:
    import warnings

    try:
        import debug_toolbar
    except ImportError:
        warnings.warn(
            "The debug toolbar was not installed. Ignore the error. \
            settings.py should already have warned the user about it."
        )
    else:
        urlpatterns += [url(r"^__debug__/", include(debug_toolbar.urls))]

    urlpatterns += static("/media/", document_root=settings.MEDIA_ROOT) + [
        url(r"^static/(?P<path>.*)$", serve),
        # url(r"^", RedirectView.as_view(url="/graphql/")),
    ]
