console.log("Welcome to Sara's Portfolio!");

const toggleBtn = document.getElementById('toggleBtn');
const mainMenuGroup = document.getElementById('mainMenuGroup');

toggleBtn.addEventListener('click', () => {
  mainMenuGroup.classList.toggle('open');
});
const profileBtn = document.getElementById('profileBtn');
const profileContainer = document.querySelector('.profile-dropdown-container');

// باز و بسته کردن منوی پروفایل
profileBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // جلوگیری از بسته شدن فوری هنگام کلیک
  profileContainer.classList.toggle('show');
});

// بسته شدن منو در صورت کلیک روی هر جای دیگر صفحه
document.addEventListener('click', (e) => {
  if (!profileContainer.contains(e.target)) {
    profileContainer.classList.remove('show');
  }
});