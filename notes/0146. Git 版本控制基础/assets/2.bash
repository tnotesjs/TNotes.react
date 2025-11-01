# 场景 1：功能模块开发过程中插入其它任务
git stash # 临时保存当前工作（未完成）
git checkout main # 切换到主分支
# ... 处理其他事情 ...

# 处理完毕后，切换回 feature-user-profile 分支
git checkout feature-user-profile
# 恢复临时保存的工作，继续处理
git stash pop
