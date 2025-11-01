# 1. 创建 React 项目
npm create vite@latest my-react-app -- --template react
cd my-react-app

# 2. 初始化 Git（vite 已自动初始化）
git status

# 3. 首次提交
git add .
git commit -m "chore: 初始化项目"

# 4. 连接远程仓库
git remote add origin https://github.com/username/my-react-app.git
git push -u origin main

# 5. 创建功能分支
git checkout -b feature-user-profile

# 6. 开发功能
# ... 编写代码 ...

# 7. 暂存并提交
git add src/components/UserProfile.jsx
# git add . # 或者一次性提交本次的所有修改
git commit -m "feat: 添加用户资料组件"

# 8. 推送功能分支
git push -u origin feature-user-profile

# 9. 在 GitHub 上创建 Pull Request

# 10. 代码审查通过后，合并到 main
git checkout main
git pull origin main
git merge feature-user-profile

# 11. 推送合并结果
git push origin main

# 12. 删除功能分支
git branch -d feature-user-profile
git push origin --delete feature-user-profile
