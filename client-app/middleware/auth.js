export default function(context) {
  if (!context.store.getters.isAdmin) {
    context.redirect('/admin/auth');
  }
}
