import API from './interceptor';

export const getByMe = () => API.get('/me');

// Auth
export const login = (data: LoginFormValues) =>
  API.post('/auth/admin/sign-in', data);
export const forgotpassword = (data: any) =>
  API.post('/auth/admin/forget-password', data);

//Member
export const memberList = () => API.get('/admin/list');
export const getProfile = () => API.get('/admin/profile');
export const updateProfile = (id: any, data: any) =>
  API.patch(`/admin/${id}`, data);
export const getMember = () => API.get('/admin/list');
export const addMember = (data: any) => API.post('/auth/admin/create', data);
export const memberDetail = (id: any) => API.get(`/admin/${id}`);

//role
export const getRoles = () => API.get('/admin/role');

//Category
export const addCategory = (data: any) => API.post('/category/add', data);
export const updateCategory = (data: any, id: any) =>
  API.patch(`/category/${id}`, data);
export const addSubcategory = (data: any) =>
  API.post('/category/sub-category', data);
export const getAllCategories = () => API.get('/category');
export const getSubCategories = () => API.get('/category/sub-category');
export const getMainCategories = () => API.get('/category/parent');
export const getBlogsbyCategory = (data: any) => API.get(`/category/${data}`);
export const removeCategory = (id: any) => API.delete(`/category/${id}`);

export const filterbyName = (searchQuery: string) =>
  API.get(`/blog/search`, {
    params: {
      q: searchQuery,
      page: 1,
      limit: 20,
    },
  });

//Products
export const getAllProducts = () => API.get('/products');
export const getProductsByView = () => API.get('/blog?q=view&page=1&limit=10');
export const getProductsByRank = () => API.get('/blog?q=rank&page=1&limit=10');
export const getDetailProduct = (id: any) => API.get(`/blog/${id}`);
export const addNewProduct = (data: any) => API.post('/blog/add', data);
export const removeProduct = (id: any) => API.delete(`/blog/${id}`);
export const updateProduct = (id: any, data: any) =>
  API.put(`/products/${id}`, data);
export const deleteImageProduct = (id: any) =>
  API.delete(`/product_images/${id}`);

export const getListofProducts = (subCategoryId: any) =>
  API.get(`/frontend/products?sub_categoryid=${subCategoryId}&sort_by=asc`);
export const getListofAllProducts = () =>
  API.get(`/frontend/products?sort_by=asc`);
export const getDetailUserProduct = (id: any) =>
  API.get(`/frontend/products/${id}`);
//Categories

export const addNewCategory = (data: any) => API.post('/categories', data);

//Feedback
export const addFeedback = (data: any) => API.post('/feedback/add', data);
export const getFeedback = () => API.get('/feedback');
export const deleteFeedback = (id: any) => API.delete(`/feedback/${id}`);
