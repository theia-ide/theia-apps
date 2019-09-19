qemu-system-arm \
  -cpu cortex-m3 \
  -machine lm3s6965evb \
  -nographic \
  -semihosting-config enable=on,target=native \
  -gdb tcp::1234 \
  -S \
  -kernel target/thumbv7m-none-eabi/debug/example-embedded
