# Question

svg 图片的颜色如何跟随父元素的颜色

# Answer

在 SVG 图片中，要让其颜色跟随父元素的颜色，可以使用 CSS 变量（自定义属性）或 `currentColor` 关键字来实现。以下是两种方法的简要说明：

1. **使用 `currentColor` 关键字**：
   - `currentColor` 是一个 CSS 关键字，它代表元素的 `color` 属性值。你可以在 SVG 的样式中使用这个关键字来设置颜色。
   - 例如，如果你有一个 SVG 图像，并希望它的路径颜色跟随父元素的文字颜色，可以在 SVG 的 `<path>` 标签中设置 `stroke` 或 `fill` 为 `currentColor`。

   ```html
   <div style="color: blue;">
       <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
           <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM16 28C22.0829 28 28 22.0829 28 16C28 9.91715 22.0829 4 16 4C9.91715 4 4 9.91715 4 16C4 22.0829 9.91715 28 16 28ZM16 8V16H8V12H12V8H16ZM20 16V12H16V16H20ZM16 20V28H12V20H16ZM20 20V24H16V20H20Z" fill="currentColor"/>
       </svg>
   </div>
   ```

   在这个例子中，SVG 路径的颜色会继承父元素（`<div>`）的 `color` 属性值，这里是蓝色。

2. **使用 CSS 变量**：
   - 你也可以定义一个 CSS 变量，并在 SVG 中引用它。
   - 这种方法在需要更复杂的样式控制时非常有用。

   ```html
   <div style="--svg-color: red;">
       <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="fill: var(--svg-color);">
           <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM16 28C22.0829 28 28 22.0829 28 16C28 9.91715 22.0829 4 16 4C9.91715 4 4 9.91715 4 16C4 22.0829 9.91715 28 16 28ZM16 8V16H8V12H12V8H16ZM20 16V12H16V16H20ZM16 20V28H12V20H16ZM20 20V24H16V20H20Z"/>
       </svg>
   </div>
   ```

   这里，SVG 的 `fill` 属性被设置为 `var(--svg-color)`，这意味着它将使用定义在父元素上的 `--svg-color` 变量的值，即红色。

这两种方法都可以让你的 SVG 图像颜色动态地跟随父元素的颜色变化。选择哪种方法可以根据具体的需求和场景来决定。
