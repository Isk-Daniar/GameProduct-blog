from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.shortcuts import render, get_object_or_404

from django.views.generic import ListView, DetailView, CreateView, UpdateView
from .models import PostBlog, Category, ExpandPost
from forms import AddPostBlogForm, AddExpandPostForm


class HomeView(ListView):
    model = PostBlog
    paginate_by = 10
    template_name = "blog/home.html"


class  PostListView(ListView):
    model = PostBlog

    def get_queryset(self):
        return PostBlog.objects.filter(category__slug=self.kwargs.get("slug")).select_related()

class PostDetailView(DetailView):
    model = PostBlog
    context_object_name = "postblog"
    slug_url_kwarg = 'postblog_slug'


class BlogCategory(ListView):
    model = Category
    template_name = "blog/list_categories.html"

# class PostBlog
def blog_form(request):
    form = AddPostBlogForm()
    if request.method == 'POST':
        form = AddPostBlogForm(request.POST,
                               request.FILES)
        form.instance.user = request.user

        if form.is_valid():
            form.save()
        return redirect('blog_menu')

class BlogCreateView(CreateView):
    form_class = AddPostBlogForm
    model = PostBlog
    template_name = "blog/blogpost_edited/blog_post_create.html"
    success_url = reverse_lazy('blog_menu')
    exclude = ['user']

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        return dict(
            super(BlogCreateView, self).get_context_data(**kwargs),
            pb_list=PostBlog.objects.filter(user=self.request.user)
        )


# class ExpandPost
class ExpandPostListView(ListView):
    model = ExpandPost
    template_name = "blog/"

class ExpandPostCreateView(CreateView):
    model = ExpandPost
    form_class = AddExpandPostForm
    template_name = "blog/blogpost_edited/expandpost_create.html"
    success_url = reverse_lazy('expandpost_create')

class ExpandPostUpdateView(UpdateView):
    model = ExpandPost
    form_class = AddExpandPostForm
    template_name = "blog/blogpost_edited/expandpost_update.html"
    success_url = reverse_lazy('expandpost_update')




