FROM theiaide/theia
COPY entrypoint /home/theia 
RUN chgrp -R 0 /home/theia && \
    chmod a+x /home/theia/entrypoint && \
    chmod -R g=u /home/theia && \
    chmod g=u /etc/passwd
USER 10001
ENTRYPOINT ["/home/theia/entrypoint"]
CMD yarn theia start /home/project --hostname 0.0.0.0
