<?xml version="1.0" encoding="utf-8" ?>

<!-- Authored by Jalaluddin Qureshi -->

<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
			<title>Park</title>
			</head>
			<body>
				<main>
					<xsl:for-each select="Locations/Location">
						
						<xsl:if test=".//LocationID='9'">
						
							<h1><xsl:value-of select=".//LocationName"></xsl:value-of></h1>
							
							<p>Location: <span><xsl:value-of select=".//Address"></xsl:value-of></span></p>
							
							<p><xsl:value-of select=".//PhoneNumber"></xsl:value-of></p>
							
							<h2>Facilities</h2>
							
							<ul>
								<xsl:for-each select=".//Facility">
									<li>
										<span>
											<xsl:value-of select=".//FacilityDisplayName"></xsl:value-of>
										</span>
										<span>
											<xsl:value-of select=".//FacilityName"></xsl:value-of>
										</span>
									</li>
								</xsl:for-each>
							</ul>
								
						</xsl:if>
			
					</xsl:for-each>
		
				</main>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>