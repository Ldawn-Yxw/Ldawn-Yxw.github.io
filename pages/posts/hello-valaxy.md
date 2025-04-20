---
title: AtCoder-abc366_e - Manhattan Multifocal Ellipse
date: 2025-4-20
updated: 2025-4-20
categories: 题解
tags:
  - 双指针
  - ACM
top: 1
---

## AC code
```cpp
#include <bits/stdc++.h>

using ll = long long;

constexpr int N = 2e6 + 10;

int n, d;
ll x[N], y[N], dx[N], dy[N];

void sol(ll a[],ll f[]) {
  a[0] = -2e6 - 1, a[n + 1] = 2e6 + 1;
  std::sort(a + 1, a + n + 1);
  ll sum_pre = 0, sum_suf = 0;
  for (int i = 1;i <= n; i++) sum_suf += a[i];
  for (int i = 0;i <= n; i++) {
    if (i) sum_pre += a[i];
    if (i) sum_suf -= a[i];
    for (ll x = a[i];x <= a[i + 1] - 1; x++) {
      ll dis = (2 * i - n) * x - sum_pre + sum_suf;
      if (dis <= d) {
        f[dis]++;
      }
    }
  }
}

int main() {
  std::ios::sync_with_stdio(false);
  std::cin.tie(nullptr);

  std::cin >> n >> d;

  for (int i = 1;i <= n; i++) {
    std::cin >> x[i] >> y[i];
  }

  sol(x, dx);
  sol(y, dy);

  for (int i = 1;i <= d; i++) {
    dx[i] += dx[i - 1];
  }

  ll ans = 0;
  for (int i = 0;i <= d; i++) {
    ans += dx[d - i] * dy[i];
  }

  std::cout << ans << "\n";

  return 0;
}
```