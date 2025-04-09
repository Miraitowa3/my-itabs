import {
    defineComponent as $,
    ref as p,
    useModel as B,
    watch as N,
    computed as z,
    resolveComponent as w,
    createBlock as _,
    openBlock as i,
    unref as x,
    withCtx as E,
    createElementVNode as e,
    normalizeStyle as L,
    createElementBlock as f,
    createTextVNode as U,
    normalizeClass as h,
    Fragment as j,
    renderList as F,
    toDisplayString as k,
    createVNode as m,
} from "vue";
import { ElDialog as H, ElInput as V } from "element-plus";
const I = { class: "flex h-full" },
    M = { class: "aside" },
    W = { class: "bb text-[18px]" },
    A = { class: "notes-sort" },
    O = {
        key: 0,
        class: "notes-tabs-body",
    },
    q = ["onClick"],
    G = { class: "d-elip" },
    J = {
        class: "notes-del",
        title: "删除备忘录",
    },
    K = ["onClick"],
    P = {
        class: "notes-del fixed",
        title: "固定到桌面",
    },
    Q = ["onClick"],
    R = {
        key: 1,
        class: "empty",
    },
    X = {
        class: "notes-add flex cursor-pointer flex-wrap items-center justify-center",
        title: "新增备忘录",
    },
    Y = { class: "main" },
    Z = { class: "note-title" },
    ee = { class: "bottom-tips mt-[5px] flex items-center justify-start text-xs" },
    te = /* @__PURE__ */ $({
        __name: "index",
        props: {
            modelValue: { type: Boolean },
            modelModifiers: {},
        },
        emits: ["update:modelValue"],
        setup(u) {
            const c = p(!1),
                d = B(u, "modelValue"),
                s = p(0),
                n = p(!0),
                o = p([
                    {
                        name: "iTab操作小技巧",
                        time: "2025/3/13 11:37",
                        fixed: !1,
                        value: "",
                    },
                ]);
            N(
                () => n.value,
                (r) => {
                    n.value
                        ? o.value.sort((t, a) => new Date(t.time).getTime() - new Date(a.time).getTime())
                        : o.value.sort((t, a) => new Date(a.time).getTime() - new Date(t.time).getTime());
                },
                {
                    immediate: !0,
                },
            );
            const C = z(() => (window == null ? void 0 : window.innerWidth));
            function b(r) {
                c.value = r;
            }
            function D() {
                o.value.push({
                    name: /* @__PURE__ */ new Date().toLocaleString(),
                    time: /* @__PURE__ */ new Date().toLocaleString(),
                    fixed: !1,
                }),
                    (s.value = o.value.length - 1);
            }
            function S(r) {
                o.value.splice(r, 1), (s.value = 0);
            }
            return (r, t) => {
                const a = w("svg-icon"),
                    T = w("DialogHeader");
                return (
                    i(),
                    _(
                        x(H),
                        {
                            modelValue: d.value,
                            "onUpdate:modelValue": t[5] || (t[5] = (l) => (d.value = l)),
                            width: C.value <= 1e3 ? "100%" : "1000px",
                            "show-close": !1,
                            class: "add-pic-container",
                            fullscreen: c.value,
                        },
                        {
                            default: E(() => [
                                e(
                                    "section",
                                    {
                                        class: "p-body",
                                        style: L({ height: c.value ? "100%" : "600px" }),
                                    },
                                    [
                                        e("div", I, [
                                            e("aside", M, [
                                                e("h2", W, [
                                                    t[6] || (t[6] = U(" 备忘录 ")),
                                                    e("span", A, [
                                                        e(
                                                            "i",
                                                            {
                                                                class: h(["desc sort-caret", { active: n.value }]),
                                                                onClick: t[0] || (t[0] = (l) => (n.value = !0)),
                                                            },
                                                            null,
                                                            2,
                                                        ),
                                                        e(
                                                            "i",
                                                            {
                                                                class: h(["asc sort-caret", { active: !n.value }]),
                                                                onClick: t[1] || (t[1] = (l) => (n.value = !1)),
                                                            },
                                                            null,
                                                            2,
                                                        ),
                                                    ]),
                                                ]),
                                                o.value.length > 0
                                                    ? (i(),
                                                      f("ul", O, [
                                                          (i(!0),
                                                          f(
                                                              j,
                                                              null,
                                                              F(
                                                                  o.value,
                                                                  (l, v) => (
                                                                      i(),
                                                                      f(
                                                                          "li",
                                                                          {
                                                                              class: h(["notes-tabs-item d-elip", { active: s.value === v }]),
                                                                              key: v,
                                                                              onClick: (g) => (s.value = v),
                                                                          },
                                                                          [
                                                                              e("h4", G, k(l.name), 1),
                                                                              e("time", null, k(l.time), 1),
                                                                              e("span", J, [
                                                                                  e(
                                                                                      "i",
                                                                                      {
                                                                                          style: {
                                                                                              "font-size": "18px",
                                                                                          },
                                                                                          onClick: (g) => S(v),
                                                                                      },
                                                                                      [m(a, { name: "del" })],
                                                                                      8,
                                                                                      K,
                                                                                  ),
                                                                              ]),
                                                                              e("span", P, [
                                                                                  e(
                                                                                      "i",
                                                                                      {
                                                                                          style: {
                                                                                              "font-size": "18px",
                                                                                          },
                                                                                          onClick: (g) => (l.fixed = !l.fixed),
                                                                                      },
                                                                                      [
                                                                                          l.fixed
                                                                                              ? (i(),
                                                                                                _(a, {
                                                                                                    key: 1,
                                                                                                    name: "no-fixed",
                                                                                                }))
                                                                                              : (i(),
                                                                                                _(a, {
                                                                                                    key: 0,
                                                                                                    name: "fixed",
                                                                                                })),
                                                                                      ],
                                                                                      8,
                                                                                      Q,
                                                                                  ),
                                                                              ]),
                                                                          ],
                                                                          10,
                                                                          q,
                                                                      )
                                                                  ),
                                                              ),
                                                              128,
                                                          )),
                                                      ]))
                                                    : (i(), f("div", R, "暂无内容")),
                                                e("div", X, [e("i", { onClick: D }, [m(a, { name: "add" })])]),
                                            ]),
                                            e("main", Y, [
                                                m(T, {
                                                    onClose: t[2] || (t[2] = (l) => (d.value = !1)),
                                                    onFullScreen: b,
                                                }),
                                                e("div", Z, [
                                                    m(
                                                        x(V),
                                                        {
                                                            modelValue: o.value[s.value].name,
                                                            "onUpdate:modelValue": t[3] || (t[3] = (l) => (o.value[s.value].name = l)),
                                                            placeholder: "请输入",
                                                        },
                                                        null,
                                                        8,
                                                        ["modelValue"],
                                                    ),
                                                ]),
                                                m(
                                                    x(V),
                                                    {
                                                        modelValue: o.value[s.value].value,
                                                        "onUpdate:modelValue": t[4] || (t[4] = (l) => (o.value[s.value].value = l)),
                                                        placeholder: "",
                                                        class: "note-content",
                                                        type: "textarea",
                                                    },
                                                    null,
                                                    8,
                                                    ["modelValue"],
                                                ),
                                                e("div", ee, [e("span", null, "最后编辑：2025-4-7 18:09:58, 创建：" + k(o.value[s.value].time), 1)]),
                                            ]),
                                        ]),
                                    ],
                                    4,
                                ),
                            ]),
                            _: 1,
                        },
                        8,
                        ["modelValue", "width", "fullscreen"],
                    )
                );
            };
        },
    }),
    le = (u, c) => {
        const d = u.__vccOpts || u;
        for (const [s, n] of c) d[s] = n;
        return d;
    },
    y = /* @__PURE__ */ le(te, [["__scopeId", "data-v-b412f3fc"]]);
y.install = (u) => {
    u.component(y.name, y);
};
export { y as default };
