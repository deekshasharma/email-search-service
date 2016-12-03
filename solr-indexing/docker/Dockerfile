
FROM ubuntu:16.04

RUN apt-get update && apt-get install -y unzip zip wget

#java1.8 jre
RUN mkdir /opt/java && \
    wget -qO- --header "Cookie: oraclelicense=accept-securebackup-cookie" --no-check-certificate http://javadl.oracle.com/webapps/download/AutoDL?BundleId=207765 | tar zxv -C /opt/java

ENV JAVA_HOME /opt/java/jre1.8.0_91

RUN export JAVA_HOME

#Solr install
ENV SOLR_VERSION 6.3.0
ENV SOLR_DOWNLOAD http://www-us.apache.org/dist/lucene/solr/$SOLR_VERSION/solr-$SOLR_VERSION.tgz
ENV SOLR_MD5_DOWNLOAD http://www-us.apache.org/dist/lucene/solr/$SOLR_VERSION/solr-$SOLR_VERSION.tgz.md5
ENV SOLR_INSTALL /opt/solr-$SOLR_VERSION

RUN     \
        mkdir -pv $SOLR_INSTALL && \
        wget -q $SOLR_DOWNLOAD && \
        wget -q $SOLR_MD5_DOWNLOAD && \
        md5sum -c solr-$SOLR_VERSION.tgz.md5 && \
        tar zxf solr-$SOLR_VERSION.tgz -C $SOLR_INSTALL --strip-components=1

RUN useradd -u 1000 -c 'Apache Solr user' solr
RUN chown -R solr:solr $SOLR_INSTALL
RUN ln -s $SOLR_INSTALL/bin/solr /usr/local/bin/solr

EXPOSE 8983
WORKDIR $SOLR_INSTALL
USER solr
CMD ["solr"]

