const initData = "user=%7B%22id%22%3A6075655377%2C%22first_name%22%3A%22pin%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22lodosb%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F5mjQ-5Ozhgt3Jq-eSyNxJphLabAvqtLJQ-KdAoMyLp6OURt1sTbd3c5INGXOiEEN.svg%22%7D&chat_instance=-2688561892202426043&chat_type=private&auth_date=1747760772&signature=Blk1DLDuHmsfwrM_S0UgGiXAKBxWdRk90bnndqOj0QJvPkVmieottXzdA2wnZlXKDZmTuMrijVv18iAElnlmAw&hash=d520b65050e01b0e3879b325dd885e427f3f0d63275dc8d3825af5b7129b8502"

const params = new URLSearchParams(initData)
const user = params.get('user')

console.log(JSON.parse(user))