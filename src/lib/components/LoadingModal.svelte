<script lang="ts">
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    export let show = false;
</script>

<div 
    style="background-color: rgba(0,0,0,0.3)"
    class="w-screen h-screen fixed top-0 left-0 justify-center items-center" 
    class:hidden={!show}
    class:flex={show}>
    <ProgressRadial stroke={100} />
</div>