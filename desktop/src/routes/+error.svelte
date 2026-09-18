<script lang="ts">
    import { page } from "$app/state"
</script>

<div class="error">
    <p class="error-code">{page.status}</p>
    <h1>Something broke</h1>
    <a href="/">Go home</a>
</div>
