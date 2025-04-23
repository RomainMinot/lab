# Movie Listing App with Vue 3 + Vite

This project is a movie listing application developed using Vue 3 with Vite. It leverages modern tools and libraries to provide a robust development environment.

## Project Structure

- **src/**: Contains the main source code for the application.
  - **components/**: Reusable Vue components such as `AppButton.vue`, `AppBadge.vue`, and `AppSpinnerLoader.vue`.
  - **views/**: Contains the main views of the application, including `index.vue`.
  - **router/**: Manages the application's routing using Vue Router. The routes are generated dynamically with `vite-plugin-pages`.
  - **stores/**: Contains state management logic using Pinia.
  - **composables/**: Reusable composition functions.
  - **services/**: Contains service logic for API calls or other business logic.
  - **assets/**: Static assets like images and styles.

## Scripts

- `dev`: Starts the development server using Vite.
- `build`: Builds the application for production.
- `preview`: Previews the production build locally.
- `lint`: Runs ESLint to check for code quality issues.
- `lint:fix`: Automatically fixes linting issues.

## Dependencies

- **Vue 3**: The progressive JavaScript framework.
- **Vite**: A fast build tool and development server.
- **Pinia**: A state management library for Vue.
- **Vue Router**: The official router for Vue.js.
- **UnoCSS**: A utility-first CSS framework.

## Development

To start developing with this application, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

Then, run the development server:

```bash
npm run dev
```

## Learn More

- [Vue 3 Documentation](https://v3.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [UnoCSS Documentation](https://github.com/unocss/unocss)

For more information on the `<script setup>` syntax used in this project, check out the [Vue 3 script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup).

For IDE support and tooling, refer to the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
